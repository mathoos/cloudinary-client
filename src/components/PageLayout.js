import { Link } from "react-router-dom";
import "./PageLayout.scss";

function PageLayout({ title, description, buttonText, buttonLink, children, backgroundImage }) {
    return (
        <div className="page-layout">
            <div className="page-layout_container">
                <div className="page-layout_container-text">
                    <Link to="/">The Drop</Link>
                    <div className="page-layout_container-text--title">
                        <h1 dangerouslySetInnerHTML={{ __html: title }} />
                        {description && <p>{description}</p>}
                        {buttonText && buttonLink && (
                            <Link to={buttonLink}>
                                <button className="bouton">{buttonText}</button>
                            </Link>
                        )}
                    </div>
                    {children}
                </div>
                <div className="page-layout_container-image">
                    <img src={backgroundImage} alt="Illustration" />
                </div>
            </div>
        </div>
    );
}

export default PageLayout;