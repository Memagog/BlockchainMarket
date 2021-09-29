import React from 'react';
import { useDispatch } from 'react-redux';
import { getDataAsync } from './../../../redux/mainSlice';

export default function Reload() {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        className="reload-button"
        onClick={() => dispatch(getDataAsync())}
      >
        reload
      </button>
    </div>
  );
}
