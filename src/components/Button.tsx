const Button = ({ children }) => {
    return (
        <button
            style={{
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                fontVariantNumeric: 'lining-nums proportional-nums',
                backgroundColor: '#2967ff',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                width: '100%',
            }}
        >
            {children}
        </button>
    );
};

export default Button;