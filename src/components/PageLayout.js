import { Link } from "react-router-dom";
import "./PageLayout.scss";

function PageLayout({ title, description, buttonText, buttonLink, children, backgroundImage, signupText }) {
    return (
        <div className="page-layout">
            <div className="page-layout_container">
                <div className="page-layout_container-text">
                    <Link to="/">The Drop</Link>
                    <div className="page-layout_container-text--title">
                        <h1 dangerouslySetInnerHTML={{ __html: title }} />
                        {description && <p className="subtitle">{description}</p>}
                        {buttonText && buttonLink && (
                            <Link to={buttonLink}>
                                <button className="bouton">{buttonText}</button>
                            </Link>
                        )}
                        {children}
                    </div>
                    
                </div>
                <div className="page-layout_container-image">
                    <img src={backgroundImage} alt="Illustration" />
                    {/* Affichage conditionnel du texte d'inscription */}
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