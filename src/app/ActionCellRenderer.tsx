import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const ActionCellRenderer = () => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Optional: jQuery or Bootstrap dropdown JS initialization if needed
    // $(dropdownRef.current).dropdown(); // Only if you're using Bootstrap JS
  }, []);

  return (
    <div className="btn-group relative" ref={dropdownRef}>
      <button
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        className="border rounded bg-white text-xs text-green-600 !border-green-600 flex items-center justify-center px-3 h-auto w-full"
      >
        <p>{"Approved"}</p>
      </button>
      {/* <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="#">
            Edit
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Delete
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Print
          </a>
        </li>
      </ul> */}
    </div>
  );
};

export default ActionCellRenderer;
