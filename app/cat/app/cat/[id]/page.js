"use client";
import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";

export default function CatDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [cat, setCat] = useState(null);

  useEffect(() => {
    const fetchCat = async () => {
      if (id) {
        const docRef = doc(db, "cats", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCat(docSnap.data());
        }
      }
    };
    fetchCat();
  }, [id]);

  if (!cat) return <div style={{ padding: 20 }}>กำลังโหลดรายละเอียด...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <button onClick={() => router.back()} style={{ marginBottom: "20px", padding: "8px 12px", cursor: "pointer" }}>
        ← ย้อนกลับ
      </button>
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        <img src={cat.image || "https://via.placeholder.com/600x350"} alt={cat.name} style={{ width: "100%", maxHeight: "350px", objectFit: "cover", borderRadius: "6px" }} />
        <h1 style={{ marginTop: "15px" }}>{cat.name}</h1>
        <p><strong>สายพันธุ์:</strong> {cat.breed}</p>
        <p><strong>อายุ:</strong> {cat.age} ปี</p>
        <p><strong>รายละเอียด:</strong> {cat.description || "ไม่มีรายละเอียดเพิ่มเติม"}</p>
      </div>
    </div>
  );
}