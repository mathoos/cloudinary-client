import {Link} from "react-router-dom";
import HomepageBackground from "../img/homepage.gif";
import './Homepage.scss';

function Homepage() {

    return (
        <div className="homepage">     
            <div className="homepage_container">
                <div className="homepage_container-text">
                    <Link to="/">The Drop</Link>
                    <div className="homepage_container-text--title">
                        <h1>Build <br/> intelligent <br/> creation.</h1>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
                            has been the industry's standard dummy text.
                        </p>
                        <Link to="/home">
                            <button className="bouton">Drop it</button>
                        </Link>
                    </div>
                </div>
                <div className="homepage_container-image">
                    <img src={HomepageBackground} alt="Bureau"/>
                </div>
            </div>     

            
        </div>
    )
}


export default Homepage;