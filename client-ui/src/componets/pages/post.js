import $ from 'jquery';
import Notification from "../common/norification";

export default function Post() {

    const serach = new URLSearchParams(useLocation().search);
    return (
        <div>
            <h2>id is ={serach.get('first')}</h2>
            <h2>id is ={serach.get('last')}</h2>
        </div>
    )
}
