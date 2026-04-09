"use client";

import { useEffect } from "react";
import supabase from "@/lib/supabase";

export default function TestDB() {

  useEffect(() => {

    const insertData = async () => {

      const { data, error } = await supabase
        .from("users")
        .insert([
          { name: "Test User" }
        ]);

      if (error) {
        alert("Insert Failed ❌");
        console.log(error);
      } else {
        alert("Data Inserted Successfully ✅");
        console.log(data);
      }

    };

    insertData();

  }, []);

  return (
    <h1>Inserting Data...</h1>
  );
}