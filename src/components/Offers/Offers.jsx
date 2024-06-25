"use client";

import React, { useEffect, useState, useRef } from "react";
import { IoMdPerson } from "react-icons/io";
import profilePic from "@/assets/images/profilePic.png";
import { FiPlus } from "react-icons/fi";
import Image from "next/image";
import Modal from "@/components/UI/Modal/Modal";
import styles from "./Offers.module.scss";
import axios from "axios";
import { toast } from "react-toastify";

const API_URI = "https://offers-varun-dhruv.cloud.okteto.net/api";

export default function Offers() {
  const [scrolledDown, setScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(false);
  const [offers, setOffers] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    timeStart: "",
    timeEnd: "",
    image: "",
    offer: "",
    tag: "",
  });
  const fileRef = useRef();
  const dragRef = useRef(null);
  const [prevImg, setPrevImg] = useState();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", handleNavScroll);
    return () => window.removeEventListener("scroll", handleNavScroll);
  }, [lastScrollY]);

  const handleNavScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > lastScrollY && currentScrollPos > 80) {
        // if scroll down hide the navbar
        setScrolledDown(true);
      } else {
        // if scroll up show the navbar
        setScrolledDown(false);
      }
      setLastScrollY(currentScrollPos);
    }
  };

  const handleFileBtnClick = () => {
    fileRef.current.click();
  };

  useEffect(() => {
    getOffers();
  }, []);

  const getOffers = async () => {
    try {
      const res = await axios.get(`${API_URI}/offers`);
      setOffers(res.data.Offers);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching offers");
    }
  };

  useEffect(() => {
    updateNewCommitteeData();
  }, [prevImg]);

  const updateNewCommitteeData = async () => {
    try {
      if (files.length > 0) {
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "itlab_image_store_preset");
        data.append("cloud_name", "dl8hmamey");
        fetch("https://api.cloudinary.com/v1_1/dl8hmamey/image/upload", {
          method: "post",
          body: data,
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data.url);
            setFormData((prev) => {
              return { ...prev, image: data.url };
            });
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const process = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;

      imgElement.onload = function (e) {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 300;

        const scaleSize = MAX_WIDTH / e.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = e.target.height * scaleSize;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

        const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
        setPrevImg(srcEncoded);
      };
    };
  };

  const handleFile = async (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.files.length; i++) {
      setFiles((prevFiles) => {
        return [...prevFiles, e.target.files[i]];
      });
    }
    await process(e.target.files[0]);
  };

  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "dragOver") dragRef.current.classList.add("active");
    else if (type === "dragLeave") dragRef.current.classList.remove("active");
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current.classList.remove("active");
    const uploadedFiles = e.dataTransfer.files;
    dragRef.current.classList.add("uploading");
    for (let i = 0; i < uploadedFiles.length; i++) {
      setFiles((prevFiles) => {
        return [...prevFiles, uploadedFiles[i]];
      });
    }
    await process(uploadedFiles[0]);
    dragRef.current.classList.remove("uploading");
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addOffer = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URI}/offers`, {
        image: formData.image,
        company: formData.company,
        offer: formData.offer,
        tag: formData.tag,
        timeStart: formData.timeStart,
        timeEnd: formData.timeEnd,
      });
      setOffers((prev) => [...prev, res.data.newOffer]);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while adding offer");
    }
  };

  return (
    // <PurchaseOrder data={data} />
    <div>
      <Modal show={show} hideBackdrop={() => setShow(false)} name="add-user">
        <div className={styles.User_form}>
          <h1 className="text-2xl font-bold">Add New Offers</h1>
          <form className="flex flex-col gap-5 mt-5">
            <div className={styles.form_item}>
              <label htmlFor="company">Store Name</label>
              <input
                type="text"
                onChange={onChange}
                name="company"
                placeholder="Store Name"
                id="company"
              />
            </div>
            <div className="flex gap-20">
              <div className={styles.form_item + " " + styles.sm}>
                <label htmlFor="timeStart">Time Start</label>
                <input
                  type="email"
                  onChange={onChange}
                  name="timeStart"
                  id="timeStart"
                  placeholder="Time Start"
                />
              </div>
              <div className={styles.form_item + " " + styles.sm}>
                <label htmlFor="timeEnd">Time End</label>
                <input
                  type="email"
                  onChange={onChange}
                  name="timeEnd"
                  id="timeEnd"
                  placeholder="Time End"
                />
              </div>
            </div>

            <div className={styles.form_item}>
              <label htmlFor="offer">Offer Percentage</label>
              <input
                type="number"
                onChange={onChange}
                name="offer"
                id="offer"
                placeholder="Offer Percentage (e.g. 10)"
              />
            </div>
            <div className={styles.form_item}>
              <label htmlFor="tag">Tag</label>
              <input
                type="text"
                onChange={onChange}
                name="tag"
                id="tag"
                placeholder="Tag (e.g. Hotel, Restaurant, etc.)"
              />
            </div>
            <div className={styles.file_upload}>
              {files.length === 0 ? (
                <div className={styles.upload_img}>
                  <div
                    ref={dragRef}
                    className={styles.drop_area}
                    onDragOver={(e) => handleDrag(e, "dragOver")}
                    onDragLeave={(e) => handleDrag(e, "dragLeave")}
                    onDrop={handleDrop}
                  >
                    <h2>Drag & Drop your profile photo here</h2>
                    <span>OR</span>
                    <div
                      className={styles.browse_btn}
                      onClick={handleFileBtnClick}
                    >
                      Browse Files
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      onChange={handleFile}
                      multiple
                      hidden
                      id="myFile"
                      name="filename"
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.image_preview}>
                  <img id="prev-img" src={prevImg} alt="" />
                </div>
              )}
            </div>
            <button onClick={addOffer} className={styles.btn_primary}>
              Add Offer
            </button>
          </form>
        </div>
      </Modal>
      <div className={`Navbar ${scrolledDown ? "scrolled" : ""}`}>
        <div className="nav_left">
          <div className="btn_primary" onClick={() => setShow(true)}>
            <FiPlus />
            Add new offer
          </div>
        </div>
        <div className="nav_right">
          <div className="search">
            <input type="text" placeholder="Search Here..." />
          </div>
          <div className="profile">
            <Image height={20} width={40} src={profilePic} alt="profilePic" />
          </div>
        </div>
      </div>
      <div className="offers">
        {offers.map((offer, index) => {
          return (
            <div className="offer" key={index}>
              <div className="offer_img">
                <img
                  src={
                    offer.image ||
                    "https://i.pinimg.com/736x/71/b3/e4/71b3e4159892bb319292ab3b76900930.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="offer_info">
                <div className="name">{offer.company}</div>
                <div className="lightTxt text-blue-100">
                  Tag: {offer.tag} |{" "}
                  <span className="text-green">{offer.offer}% Off</span>
                </div>
                <div className="lightTxt text-gray">Open: 9am - 10pm</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
