"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ShopForm({ initialData = null, mode = "add", }) {
  const router = useRouter();
  const [form, setForm] = useState({
    shopName: initialData?.shopName || "",
    shopAddress: initialData?.shopAddress || "",
    shopContact: initialData?.shopContact ?? "",
    shopOpen: initialData?.shopOpen || false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "add") {
        // Call the API to add store information.
  const response = await fetch(
    `http://localhost:3000/api/shops`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
     },
      body: JSON.stringify(form),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create Shop");
  }
  await response.json();
      } else {
        // Call the API to query store information by ID. 
  const response = await fetch(
    `http://localhost:8000/api/shops/${initialData.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  );
 
  if (!response.ok) {
    throw new Error("Failed to update shop.");
  }
  await response.json();
      }
      router.push("/week08");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 className="text-2xl font-bold">
  {mode === "add" ? "Add New Shop"  : "Update Shop"}
      </h2>
      {error && (
<p className="text-red-600">       
  {error}
</p>
     )}

      {/* Name */}
      <div>
  <label className="block font-semibold mb-1">
    Shop Name
  </label>
  <input
    type="text"
    name="shopName"
    value={form.shopName}
    onChange={handleChange}
    required
    className="w-full border rounded-lg p-3"
  />
      </div>

      {/* Address */}
      <div>
  <label className="block font-semibold mb-1">
   Address </label>
<input
    type="text"
    name="shopAddress"
    value={form.shopAddress}
    onChange={handleChange}
    required
    placeholder="Bangkok"
    className="w-full border rounded-lg p-3"
  />
      </div>

      {/* Contact */}
      <div>
  <label className="block font-semibold mb-1"> Contact </label>
  <input
    type="text"
    name="shopContact"
    value={form.shopContact}
    onChange={handleChange}
    required
    placeholder="029999999"
    className="w-full border rounded-lg p-3"
   />
      </div>

      {/* Status */}
  <div>
  <label className="block font-semibold mb-1">Status</label>
  <select
    name="shopOpen"
    value={form.shopOpen}
    onChange={handleChange}
    className="w-full border rounded-lg p-3"
  >
    <option value="">Please select</option>
    <option value="true">Open</option>
    <option value="false">Close</option>
  </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
  <button type="submit"
    disabled={loading} className="bg-blue-600 text-white px-5 py-3 rounded-lg disabled:opacity-50">
    {loading ? "Saving..." 
     : mode === "add" ? "Add Shop" 
     : "Update Shop"}
  </button>

  <button type="button" onClick={() => router.push("/week08")}
    className="bg-gray-300 px-5 py-3 rounded-lg">
    Cancel
  </button>
      </div>
    </form>
  );
}