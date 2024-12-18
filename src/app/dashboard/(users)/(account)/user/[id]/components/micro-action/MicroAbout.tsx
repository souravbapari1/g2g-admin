import React from "react";

function MicroAbout() {
  return (
    <div className=" mb-20 mt-10 bg-red-50 md:p-20 p-5 rounded-3xl">
      <h1 className="md:text-4xl text-2xl font-bold">About US</h1>
      <br />
      <p className="md:text-base text-sm">
        In our journey of sustainable living, we met two types of people...
        those who wanted to be sustainable but didn’t know how to start, and
        those who were hesitant, and worried about the time, energy, and cost
        involved.
      </p>
      <br />
      <p className="md:text-base text-sm">
        ReThink was designed with both of these groups in mind. It’s a program
        that focuses on micro-actions to create a positive impact on the
        environment. These micro-actions are small, manageable tasks that take
        just 15 minutes each month, but when combined, they build a powerful
        force for good and demonstrate that you don’t need to overhaul your
        entire routine to make a difference.
      </p>
      <br />
      <p className="md:text-base text-sm">
        By joining ReThink, you become part of what could be the largest
        movement of our time. Together, we can reshape our world and leave a
        legacy that future generations will remember and celebrate, one
        micro-action at a time.
      </p>
    </div>
  );
}

export default MicroAbout;
