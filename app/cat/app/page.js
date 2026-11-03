"use client";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลแมวจาก Firestore
  const fetchCats = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cats"));
      const catList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCats(catList);
    } catch (error) {
      console.error("Error fetching cats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  // ฟังก์ชันลบข้อมูลแมว
  const handleDelete = async (id) => {
    if (confirm("คุณต้องการลบข้อมูลแมวตัวนี้ใช่หรือไม่?")) {
      try {
        await deleteDoc(doc(db, "cats", id));
        setCats(cats.filter((cat) => cat.id !== id));
        alert("ลบข้อมูลเรียบร้อยแล้ว");
      } catch (error) {
        console.error("Error deleting cat:", error);
      }
    }
  };

  if (loading) return <div style={{ padding: 20 }}>กำลังโหลดข้อมูล...</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Cats List (รายการแมว)</h2>
        <Link href="/add">
          <button style={{ backgroundColor: "#28a745", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            + Add New Cat
          </button>
        </Link>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {cats.map((cat) => (
          <div key={cat.id} style={{ border: "1px solid #ddd", borderRadius: "8px", width: "250px", overflow: "hidden", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <img src={cat.image || "https://via.placeholder.com/250x180"} alt={cat.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 10px 0" }}>{cat.name}</h3>
              <p style={{ color: "#666", margin: "5px 0" }}>สายพันธุ์: {cat.breed}</p>
              <p style={{ color: "#666", margin: "5px 0" }}>อายุ: {cat.age} ปี</p>
              
              <div style={{ display: "flex", gap: "8px", marginTop: "15px" }}>
                <Link href={`/cat/${cat.id}`}>
                  <button style={{ backgroundColor: "#007bff", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
                    View
                  </button>
                </Link>
                <button onClick={() => handleDelete(cat.id)} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}