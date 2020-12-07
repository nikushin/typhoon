import {SvgIcon} from "./recipe-menu-styled";
import React from "react";

export const OkIcon = () => {
    return (
        <SvgIcon viewBox="0 0 70 70">
            <polyline points="13.29 39.16 30.2 56.06 56.71 13.94"/>
        </SvgIcon>
    )};

export const DeleteIcon = () => {
    return (
        <SvgIcon viewBox="0 0 70 70">
            <g>
                <line className="cls-1" x1="19.44" y1="19.44" x2="50.56" y2="50.56"/>
                <line className="cls-1" x1="50.56" y1="19.44" x2="19.44" y2="50.56"/>
            </g>
        </SvgIcon>
    )};

export const AddIcon = () => {
    return (
        <SvgIcon viewBox="0 0 70 70">
            <g>
                <line className="cls-1" x1="13" y1="35" x2="57" y2="35"/>
                <line className="cls-1" x1="35" y1="13" x2="35" y2="57"/>
            </g>
        </SvgIcon>
    )};

export const LeftIcon = () => {
    return (
        <SvgIcon viewBox="0 0 70 70">
        <g>
            <line x1="46.53" y1="58.06" x2="23.47" y2="35"/>
            <line x1="46.53" y1="11.94" x2="23.47" y2="35"/>
        </g>
        </SvgIcon>
    )};

export const RightIcon = () => {
    return (
        <SvgIcon viewBox="0 0 70 70">
            <g>
                <line x1="23.47" y1="11.94" x2="46.53" y2="35"/>
                <line x1="23.47" y1="58.06" x2="46.53" y2="35"/>
            </g>
        </SvgIcon>
    )};