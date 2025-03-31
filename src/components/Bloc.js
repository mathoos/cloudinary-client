import {Link} from "react-router-dom";

const Bloc = ({ title, subtitle, data, buttons, link, children }) => {
    return (
        <div className="bloc">
            <div className="bloc_title">
                <div className="bloc_title-up">
                    <h3>{title}</h3>
                    {link && (
                        <Link to={link.url} className="bouton bouton_gris-dark bouton_petit">
                            {link.text}
                        </Link>
                    )}
                </div>    
                <p>{subtitle}</p>
            </div>
            {data !== undefined && data !== null && (
                <div className="bloc_data">
                    <p>{data}</p>
                </div>
            )}
            {buttons && buttons.length > 0 && (
                <div className="bloc_buttons">
                    {buttons.map((button, index) => (
                        <button key={index} onClick={button.onClick} className="bouton bouton_gris-dark bouton_grand">
                            {button.text}
                        </button>
                    ))}
                </div>
            )}
            
            {children} 
        </div>
    );
};

export default Bloc;