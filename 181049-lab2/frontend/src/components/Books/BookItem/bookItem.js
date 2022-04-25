import React from 'react';
import {Link} from "react-router-dom";

const bookItem = (props)=>{
    return(
            <tr key={props.item.id}>
                <td scope={"col"}> {props.item.name}</td>
                <td scope={"col"}> {props.item.category}</td>
                <td scope={"col"}> {props.item.author.name}</td>
                <td scope={"col"}> {props.item.availableCopies}</td>
                <td className={"text-right"}>
                    <a title={"Delete"} className={"btn btn-danger"}
                       onClick={() => props.onDelete(props.item.id)}>
                        Delete
                    </a>
                    <Link className={"btn btn-info ml-2"}
                          onClick={() => props.onEdit(props.item.id)}
                          to={`/books/edit/${props.item.id}`}>
                        Edit
                    </Link>
                    <Link className={"btn btn-success ml-2"}
                          onClick={() => props.onMark(props.item.id)}>
                        Mark as taken
                    </Link>
                </td>
            </tr>
    )
}
export default bookItem;