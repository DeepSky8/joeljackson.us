import React from "react";

const Field = ({ label, id, theme, type, placeholder, value, change, blur }) => {

    return (
        <div className="field__container">
            <span className={`field__container--description ${theme}`}>
                <label htmlFor={id}>{label}</label>
            </span>
            <span className="field__container--input">
                <input
                    id={id}
                    className={`field--input ${theme}`}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={change}
                    onBlur={blur}
                />
            </span>
        </div>
    )
}

export default Field