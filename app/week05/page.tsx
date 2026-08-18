"use client";

import { handleBuildComplete } from "next/dist/build/adapter/build-complete";
// import Header from "../components/header";
// import Footer from "../components/footer";

import { useState } from "react";
import ToDoForm from "./component/ToDoForm";
import Modal from "./component/Modal";
import { title } from "process";
export default function ToDoLists(){

    // State variadles
    const [ count, setConut ] = useState(0);
    const [Comp, setComp] = useState(null);
    const [open, setOpen] = useState(false);
    const[selectedTask, setSelectedTask] = useState(null);
    const[editingTask, setEditingTask] = useState(null);

    const resetEditngTask = () => setEditingTask(null);

    const incConut = () =>{
        setConut(count+1);
    }

    const desConut = () => {
     setConut(count-1);
    }

    let name = "kittipong mayaem";
    let major = "DBI";
    let studentNo = "026730462001-1";
    let active = true;
    const role = "Student";

    const toDoItem = [
        {
            id: 1,
            title: "เรียนวิชา Web Programming",
            completed: true
        },
        {
            id: 2,
            title: "เรียนวิเคราะห์ข้อมูลเชิงธุรกิจ",
            completed: true
        },
        {
            id: 3,
            title: "กินข้าวมื้อเย็นที่ Central ลาดพร้าว",
            completed: true
        }
    ];
    const newItems = [
        {
            id: 4,
            title: "สร้างคลิปสอนงานเขียนโปรแกรมเว็บ",
            completed: false
        },
        {
            id: 5,
            title: "ออกกำลังกายที่สวนจักรพงษ",
            completed: false
        }
    ];

    const updateToDoList = [...toDoItem, ...newItems];
    const [tasks, setTasks] = useState(updateToDoList);
     const isActive = (active: boolean) => {
        if(active == true)
         return <>{role}</>;
        else
         return <>N/A</>;
    }


    const isCompleted = (c: boolean) => {
     return c ? "ดำเนินการแล้ว" : "รอดำเนินการ"
    }

    const newToDoList = updateToDoList.filter(
    (item) => {
        if(Comp == null)
            return item.completed == true || item.completed == false
        else
            return item.completed == Comp
    }
    );

    const handleDelete = (id) => {
        const updateTasks = tasks.filter(item => item.id != id);
        setTasks(updateTasks);
    };

const handleView = (task) => {
   // alert('You choose handleView function.');
   setSelectedTask(task);
   setOpen(true);
};

const handleEdit = (task) => {
   // alert(task);
   setEditingTask(task);
};

const updateTask = (id, title, completed) => {
setTasks(
    (tasks) => tasks.map((t) =>
    t.id === id ? {
    ...t,
    title: title,
    completed: completed
    } :t
));
setEditingTask(null);

}

    const getToDoItem = tasks.map((item) => {
        //<li>{item}</li>
        const {id, title, completed} = item;

        

    return (
    <li key={id}className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-all group">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        />
        <span className="text-sm font-medium text-gray-700">รหัสรายการ: {id}</span>
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <span className="text-sm font-medium text-gray-700">สถานะ: {isCompleted(completed)}</span>
      </div>

<div className="flex gap-2 mt-2">
    {/* View */}
    <button onClick={(e)=>handleView(item)} className="bg-green-500 text-white px-3 py-1 rounded">View</button>

    {/* Edit */}
    <button onClick={(e)=>handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
    </div>

      <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={(e) => handleDelete(id)}>
        <svg xmlns="http://w3.org" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
    );
    });

    console.log("Name: ", name);

const handleCompleted = (comp) => {
  setComp(comp);
}

const addTask=(title, completed) =>{
    const newTask = {
     id: newToDoList.length+1,
     title: title,
     completed: completed
    };

    setTasks([...tasks, newTask]);
}

    return (
      <>
      {/* <Header /> */}

<div className="flex items-center justify-center mt-10">
  <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-sm p-6 text-center">
        
    {/*<!-- Name & Title -->*/}
    <h3 className="text-xl font-bold text-olive-800 mb-5">ชื่อ-สกุล: {name}</h3>
    <p className="text-sm font-medium text-olive-600 mb-3">รหัสนักศึกษา: {studentNo}</p>
    <p className="text-sm font-medium text-olive-600 mb-3">สาขาวิชา: {major}</p>
    <p className="text-sm font-medium text-olive-600 mb-3">สถานภาพนักศึกษา: {isActive(active)}</p>

  </div>
</div>
<div className="flex items-center justify-center mt-10" >
<div className="text-2xl font-bold">
     {count}
</div>
<button onClick={incConut}
className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
>เพิ่มค่า</button>

<button onClick={desConut}
className="px-5 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
>ลดค่า</button>
</div>

<ToDoForm 
addTask={addTask} 
editingTask={editingTask}
updateTask={updateTask}
restEditingTask={resetEditngTask}
/>

<div>
    <button onClick={() =>handleCompleted(null)} className=
    "px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">ทั้งหมด</button>
    <button onClick={() =>handleCompleted(true)} className=
    "px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">ดำเนินการแล้ว</button>
    <button onClick={() =>handleCompleted(false)} className=
    "px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">รอดำเนินการ</button>
<div className="flex items-center justify-center mt-10" >
<div className="text-2xl font-bold">
    {tasks.length}
    </div>
    </div>
</div>
        {/*
        <p>ชื่อ-สกุล: {name}</p>
        <p>รหัสนักศึกษา: {studentNo}</p>
        <p>สาขาวิชา: {major}</p>
        <p>สถานภาพนักศึกษา: {isActive(active)}</p>
        <p>บทบาท: {role}</p>*/}
<div className="flex items-center justify-center mt-10">
        <h1 className = "text-xl font-bold text-olive-800 mb-5">รายการที่ต้องทำ</h1>
        <ul className = "list-disc pl-5 pr-5 space-y-3 text-slate-700">
            {getToDoItem}
        </ul>
        </div>
        <Modal
open={open}
onClose={()=>{
    setOpen(false);
    setSelectedTask(null);
}}
task={selectedTask}

        />
        {/* <Footer /> */}
      </>
    );
}