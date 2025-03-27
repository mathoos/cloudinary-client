const Bloc = ({ title, subtitle, data, buttons, children }) => {
    return (
        <div className="bloc">
            <div className="bloc_title">
                <h3>{title}</h3>
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
                        <button key={index} onClick={button.onClick} className="bouton">
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