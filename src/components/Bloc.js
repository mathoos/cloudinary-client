const Bloc = ({ text, children }) => {
    return (
        <div className="bloc">
            <h3>{text}</h3>
            {children} 
        </div>
    );
};

export default Bloc;