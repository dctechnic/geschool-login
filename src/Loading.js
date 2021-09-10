
import React from 'react';
import LoadingInline from './LoadingInline'

const Loading = ({show, message}) =>
{
    return(
        <div className="loading-wrap" style={{ display: show ? '' : 'none' }} >
            <LoadingInline />

            <p style={{textAlign: 'center'}}>{message}</p>
        </div>
    )
    
}




export default Loading;



