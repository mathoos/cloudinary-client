const Bloc = ({ title, subtitle, data, children }) => {
    return (
        <div className="bloc">
            <div className="bloc_title">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
            <div className="bloc_data">
                <p>{data}</p>
            </div>
            
            {children} 
        </div>
    );
};

export default Bloc;