import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import '../InfoBox.css';

function InfoBox ({ title, cases, total, isCases, isRecovered, isDeaths, ...props }){
    return (
        <Card onClick={props.onClick} className={`infoBox ${isCases && 'casesBox' } 
        ${isRecovered && 'recoveredBox' } ${isDeaths && 'deathsBox' }`}> 
            <CardContent>
                <h3 className='infoTitle' color='textSecondary'>{title}</h3>
                <h2 className='infoCasesBox'>{cases}</h2>
                <h3 className='infoTotalBox' color='textSecondary'>{total} Total</h3>
            </CardContent>
        </Card>
    );
}
 
export default InfoBox;