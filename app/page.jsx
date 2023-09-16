"use client"
import { useState, useEffect } from 'react';
import star_img from "./asset_photo/star.png";

import React from 'react';
import Image from 'next/image';

function page() {

    // const[formData,setformData] = useState({title:"", description:""});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showForm, setShowForm] = useState(false)
    const [maintask, settask] = useState([]);
    const [taskComplete, settaskComplete] = useState([]);



    function submitHandler(e) {
        e.preventDefault()
        settask([...maintask, { title, description }]);
        saveTasksToLocalStorage([...maintask, { title, description }]);

        setTitle("");
        setDescription("");
    }

    //  Load tasks from local storage on component m~ount
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('maintask')) || [];
        const storedCompleteTask = JSON.parse(localStorage.getItem('taskComplete')) ||[];
        settaskComplete(storedCompleteTask);
        settask(storedTasks);
    }, []);

    var rendertask = <h1>byeee</h1>

    //  to save the data to local host
    const saveTasksToLocalStorage = (updatedTasks) => {
        localStorage.setItem('maintask', JSON.stringify(updatedTasks));

    };
    const saveCompleteTaskeStorage = (updatedTasks)=>{
        localStorage.setItem('taskComplete',JSON.stringify(updatedTasks))
    }


    //    remove task form list
    function deleteHandler(idx) {
        let copytask = [...maintask]
        copytask.splice(idx, 1);

        settask(copytask);
        saveTasksToLocalStorage(copytask);
    }
    function deleteCompleteHandler(idx,e) {
        let target_div = document.querySelector(`id${idx}`);


        let copytask = [...taskComplete];
        let obj = copytask.splice(idx,1);
        settaskComplete(copytask);
        saveCompleteTaskeStorage(copytask);
        
        console.log(target_div);
        
    }

    
    function taskCompleteHander(idx) {
        let copytask = [...maintask];
        let flag = copytask.splice(idx, 1);

        let cliked_obj = flag[0];
        let copytaskcomplete = [...taskComplete, cliked_obj];
        saveCompleteTaskeStorage(copytaskcomplete);
        settaskComplete(copytaskcomplete);
        saveTasksToLocalStorage(copytask);
        settask(copytask);
        
        // console.log(cliked_obj);
    }

    // render taske in UI  
    rendertask = maintask.map((obje, idx) => {
        return <div key={idx} className='to_do_card render_card'>
            <div className='card_header'>
                {/* funtion btns  */}
                <div className='mini_btns_div'>

                    <button className='circle-btn funtion_btn1' onClick={() => { deleteHandler(idx) }} id=''></button>
                    <button className='circle-btn funtion_btn2' onClick={() => { taskCompleteHander(idx) }} id=""></button>
                    <button className='circle-btn funtion_btn3' id=''></button>
                </div>
                <h2 className='card_heading'>{obje.title}</h2>

            </div>
            <p key={idx} className="render_card_body">{obje.description}</p>
        </div>




    });

    // html of renderCompleted_task elements
    var renderCompleted_task = taskComplete.map((obj, idx) => {
        return (<div key={idx} className='complete_task card' id={`id${idx}`}>
            <span onDoubleClick={(e)=>{deleteCompleteHandler(idx,e)}} className='star_div'><Image src={star_img}  className='star_img' alt="" /></span>
            <h1 className='complete_heading'>{obj.title}</h1>
        </div>)
    

    })



    return (
        <div className='main_wapper'>

            {/* left Side of body */}
            <div className='left_part'>

                <div className="left_div">

                    <h1 className='top_heading'>To-Do List</h1>

                    <div className='letf_lower'>

                        <div className="nav_bar">
                            <span className='star_div'><Image src={star_img}  className='star_img' alt="" /></span>
                            <h1 className='lower_heading'>Completed</h1>
                        </div>
                        <div className='complete_task_div'>
                            {renderCompleted_task}
                            
                        </div>

                    </div>
                </div>

            </div>

            {/* right part of body */}

            <div className="right_part">

                {showForm ? (<form onSubmit={submitHandler} className=" to_do_card input_card">

                    {/* form ka header part */}
                    <div className="form_card_header">
                        <div className='mini_btns_div'>
                            <button className='circle-btn btn1' id=''></button>
                            <div className='circle-btn btn2' id=""></div>
                            <div className='circle-btn btn3' id=''></div>
                        </div>
                        <input type="text"
                            placeholder='title'
                            className=' title_area'
                            value={title}
                            name='title'
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />


                    </div>

                    {/* form ka body where we get the descrition form user */}
                    <div className="form_card_body">
                        <textarea type="text-area"
                            placeholder='Description'
                            className='decription_area'
                            value={description}
                            name='description'
                            onChange={(e) => {
                                setDescription(e.target.value)

                            }}
                        />

                    </div>

                </form>) : (<div className=" to_do_card input_card">

                    <div className='card_header'>
                        <div className='mini_btns_div'>

                            <button className='circle-btn btn1' id=''></button>
                            <button className='circle-btn btn2' id=""></button>
                            <button className='circle-btn btn3' id=''></button>
                        </div>
                        <h2 className='card_heading'>Hello ji! </h2>

                    </div>
                    <div className="card_body">

                        <div className='add_img' onClick={() => {
                            setShowForm(prev => (!prev))
                        }}>
                            <div className='min_line1'></div>
                            <div className='min_line2'></div>

                        </div>
                    </div>

                </div>)}


                {/* render the card and to-do-list form array */}
                {rendertask}

            </div>



            {/* <h1>Piyush's to-do list </h1>
            <form onSubmit={submitHandler} className='form-div ' >
                <input type="text"
                    placeholder='title'
                    className='border-2 border-black '
                    value={title}
                    name='title'
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />

                <textarea type="text-area "
                    placeholder='description'
                    className='border-2 border-black'
                    value={description}
                    name='description'
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                />
                <button className=''>Add it </button>
            </form>





            <hr />



             show take to ui rendering cards
            <div className='cards'>
                {rendertask}
            </div> */}

        </div>
    )

}
export default page
