import React from "react";

const SlotSelector = ({ doctorId, date, onSelect }) => {
  if (!doctorId || !date) return null;

  const slots = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];

  return (
    <div>
      <h3>Select a Slot:</h3>
      {slots.map((slot, index) => (
        <button key={index} onClick={() => onSelect(slot)}>
          {slot}
        </button>
      ))}
    </div>
  );
};

export default SlotSelector;
