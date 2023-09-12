import React, { useReducer, useEffect, useContext } from 'react';
import { validate } from '../../util/validators';
import './Input.css';
import { NewPlaceContext } from '../../../places/NewPlaceContextProvider';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const placeCntxt = useContext(NewPlaceContext);
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

    const buttonText = placeCntxt.isValid ? "Change on the map?" : "Add on the map!"
  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <div className="addressDiv">
      {element}
      {props.id==="address" && inputState.value &&  <button className= {placeCntxt.isValid ? "change" : "add" }  onClick={props.onAddtoMap}> {buttonText} </button>}
      </div>
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    
    </div>
  );
};

export default Input;
