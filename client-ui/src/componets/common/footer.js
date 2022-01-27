import $ from 'jquery';

export default function Footer() {
    if (window.location.pathname === '/') return null;
    return (
       <footer className="main-footer">
  <strong>Srimal © 2021 </strong>
  All rights reserved.
  <div className="float-right d-none d-sm-inline-block">
    <b>Version</b> 1.0
  </div>
</footer>

    )
}
