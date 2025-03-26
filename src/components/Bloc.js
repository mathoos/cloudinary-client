const Bloc = ({ title, subtitle, data, buttons, children }) => {
    return (
        <div className="bloc">
            <div className="bloc_title">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
            <div className="bloc_data">
                <p>{data}</p>
            </div>
            <div className="bloc_buttons">
                {buttons && buttons.map((button, index) => (
                    <button key={index} onClick={button.onClick} className="bouton">
                        {button.text}
                    </button>
                ))}
            </div>
            
            {children} 
        </div>
    );
};

export default Bloc;