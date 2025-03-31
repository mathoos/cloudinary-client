import { Link } from "react-router-dom";
import "./PageLayout.scss";

function PageLayout({ title, description, buttonText, buttonLink, secondButtonText, secondButtonLink,children, backgroundImage, signupText, logo }) {
    return (
        <div className="page-layout">
            <div className="page-layout_container">
                <div className="page-layout_container-text">
                    {logo && (
                        <Link to="/">The Drop</Link>
                    )}
                    <div className="page-layout_container-text--title">
                        <h1 dangerouslySetInnerHTML={{ __html: title }} />
                        {description && <p className="subtitle">{description}</p>}
                        <div className="buttons-container"> 
                            {buttonText && buttonLink && (
                                <Link to={buttonLink}>
                                    <button className="bouton bouton_gris-dark">{buttonText}</button>
                                </Link>
                            )}
                            {secondButtonText && secondButtonLink && (
                                <Link to={secondButtonLink}>
                                    <button className="bouton bouton_gris">{secondButtonText}</button>
                                </Link>
                            )}
                        </div>
                        {children}
                    </div>
                    
                </div>
                <div className="page-layout_container-image">
                    <img src={backgroundImage} alt="Illustration" />

                    {signupText && (
                        <p className="page-layout_container-image--signup">
                            {signupText}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PageLayout;