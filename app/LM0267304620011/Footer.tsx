"use client";

import { useState } from "react";
export default function Mypets(){
     const [count, setCount] = useState(0);
    const [comp, setComp] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editngTask, setEditingTask] = useState(null);

    const resetEditingTask = () => setEditingTask(null);


    const incCount = () => {
        setCount(count+1);
    }

    const decCount = () => {
        setCount(count-1);
    }

    // eslint-disable-next-line prefer-const
    let name = "Kittipong mayaem";
    // eslint-disable-next-line prefer-const
    let major = "DBI";
    // eslint-disable-next-line prefer-const
    let studentNo = "0267304620011";
    // eslint-disable-next-line prefer-const
    let active = true;
    const role = "Student";

}