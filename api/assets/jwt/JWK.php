<?php

namespace Firebase\JWT;

use DomainException;
use InvalidArgumentException;
use UnexpectedValueException;


class JWK
{
 
    public static function parseKeySet(array $jwks)
    {
        $keys = array();

        if (!isset($jwks['keys'])) {
            throw new UnexpectedValueException('"keys" member must exist in the JWK Set');
        }
        if (empty($jwks['keys'])) {
            throw new InvalidArgumentException('JWK Set did not contain any keys');
        }

        foreach ($jwks['keys'] as $k => $v) {
            $kid = isset($v['kid']) ? $v['kid'] : $k;
            if ($key = self::parseKey($v)) {
                $keys[$kid] = $key;
            }
        }

        if (0 === \count($keys)) {
            throw new UnexpectedValueException('No supported algorithms found in JWK Set');
        }

        return $keys;
    }


    public static function parseKey(array $jwk)
    {
        if (empty($jwk)) {
            throw new InvalidArgumentException('JWK must not be empty');
        }
        if (!isset($jwk['kty'])) {
            throw new UnexpectedValueException('JWK must contain a "kty" parameter');
        }

        switch ($jwk['kty']) {
            case 'RSA':
                if (!empty($jwk['d'])) {
                    throw new UnexpectedValueException('RSA private keys are not supported');
                }
                if (!isset($jwk['n']) || !isset($jwk['e'])) {
                    throw new UnexpectedValueException('RSA keys must contain values for both "n" and "e"');
                }

                $pem = self::createPemFromModulusAndExponent($jwk['n'], $jwk['e']);
                $publicKey = \openssl_pkey_get_public($pem);
                if (false === $publicKey) {
                    throw new DomainException(
                        'OpenSSL error: ' . \openssl_error_string()
                    );
                }
                return $publicKey;
            default:
                // Currently only RSA is supported
                break;
        }
    }

  
    private static function createPemFromModulusAndExponent($n, $e)
    {
        $modulus = JWT::urlsafeB64Decode($n);
        $publicExponent = JWT::urlsafeB64Decode($e);

        $components = array(
            'modulus' => \pack('Ca*a*', 2, self::encodeLength(\strlen($modulus)), $modulus),
            'publicExponent' => \pack('Ca*a*', 2, self::encodeLength(\strlen($publicExponent)), $publicExponent)
        );

        $rsaPublicKey = \pack(
            'Ca*a*a*',
            48,
            self::encodeLength(\strlen($components['modulus']) + \strlen($components['publicExponent'])),
            $components['modulus'],
            $components['publicExponent']
        );

        // sequence(oid(1.2.840.113549.1.1.1), null)) = rsaEncryption.
        $rsaOID = \pack('H*', '300d06092a864886f70d0101010500'); // hex version of MA0GCSqGSIb3DQEBAQUA
        $rsaPublicKey = \chr(0) . $rsaPublicKey;
        $rsaPublicKey = \chr(3) . self::encodeLength(\strlen($rsaPublicKey)) . $rsaPublicKey;

        $rsaPublicKey = \pack(
            'Ca*a*',
            48,
            self::encodeLength(\strlen($rsaOID . $rsaPublicKey)),
            $rsaOID . $rsaPublicKey
        );

        $rsaPublicKey = "-----BEGIN PUBLIC KEY-----\r\n" .
            \chunk_split(\base64_encode($rsaPublicKey), 64) .
            '-----END PUBLIC KEY-----';

        return $rsaPublicKey;
    }

  
    private static function encodeLength($length)
    {
        if ($length <= 0x7F) {
            return \chr($length);
        }

        $temp = \ltrim(\pack('N', $length), \chr(0));

        return \pack('Ca*', 0x80 | \strlen($temp), $temp);
    }
}
