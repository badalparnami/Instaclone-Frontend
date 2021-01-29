import React from "react";

const RadioButton = ({ name, isChecked, content, value, onChange }) => (
  <div onClick={() => onChange(value)} className="radio-button">
    <input
      type="radio"
      name={name}
      value={value}
      checked={isChecked}
      onChange={() => {}}
    />
    {content}
  </div>
);

const SettingsFormGroup = ({
  type,
  placeholder,
  value,
  label,
  isRequired,
  h2Content,
  pContent,
  children,
  name,
  isChecked,
  onChange,
  extras,
  revert,
  revertHandler,
}) => {
  return (
    <div className="form-group">
      <aside>
        <label htmlFor={placeholder}>{label}</label>
      </aside>
      <div className="input-component">
        <div className="input-component-sub">
          {type !== "textarea" && !isChecked && type && (
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              required={isRequired}
              id={placeholder}
              onChange={(e) => onChange(e.target.value)}
              {...extras}
            />
          )}

          {h2Content && <h2>{h2Content}</h2>}

          {type === "checkbox" && (
            <>
              <input
                type="checkbox"
                checked={isChecked[0]}
                onChange={() => {}}
              />
              <div onClick={onChange} className="checkbox-lookalike"></div>
            </>
          )}

          {type === "radio" && name === "usertag" && (
            <>
              <RadioButton
                name="usertag"
                content="Add Automatically"
                isChecked={isChecked[0]}
                value="automatically"
                onChange={onChange}
              />

              <RadioButton
                name="usertag"
                content="Add Manually"
                isChecked={isChecked[1]}
                value="manually"
                onChange={onChange}
              />
            </>
          )}

          {type === "radio" && name !== "usertag" && (
            <>
              <RadioButton
                name={name}
                content="Everyone"
                isChecked={isChecked[0]}
                value="everyone"
                onChange={onChange}
              />
              <RadioButton
                name={name}
                content="People you follow"
                isChecked={isChecked[1]}
                value="follow"
                onChange={onChange}
              />
              <RadioButton
                name={name}
                content="No one"
                isChecked={isChecked[2]}
                value="none"
                onChange={onChange}
              />
            </>
          )}

          {pContent && (
            <p>
              {pContent}{" "}
              {revert && (
                <button onClick={revertHandler} className="revert">
                  Revert to {revert}?
                </button>
              )}
            </p>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingsFormGroup;
