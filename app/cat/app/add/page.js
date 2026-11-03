"use client";
import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AddCat() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "cats"), {
        name,
        breed,
        age: Number(age),
        description,
        image,
      });
      alert("เพิ่มข้อมูลแมวเรียบร้อย!");
      router.push("/");
    } catch (error) {
      console.error("Error adding cat:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>เพิ่มข้อมูลแมวใหม่</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input type="text" placeholder="ชื่อแมว" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: "8px" }} />
        <input type="text" placeholder="สายพันธุ์" value={breed} onChange={(e) => setBreed(e.target.value)} required style={{ padding: "8px" }} />
        <input type="number" placeholder="อายุ (ปี)" value={age} onChange={(e) => setAge(e.target.value)} required style={{ padding: "8px" }} />
        <input type="text" placeholder="URL รูปภาพแมว" value={image} onChange={(e) => setImage(e.target.value)} style={{ padding: "8px" }} />
        <textarea placeholder="รายละเอียดเพิ่มเติม" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" style={{ padding: "8px" }} />
        
        <button type="submit" style={{ backgroundColor: "#28a745", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          บันทึกข้อมูล
        </button>
      </form>
    </div>
  );
}