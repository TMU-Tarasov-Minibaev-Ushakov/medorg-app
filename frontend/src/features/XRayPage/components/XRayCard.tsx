import React from 'react';
import {Button, Card, Flex, Image} from "antd";
import {analyzeXRay, AnalyzeXRayResponse} from "../../../api/ml/analyzeXRay";
import {deleteXRayImage} from "../../../api/ml/deleteXRayImage";
import {useNavigate} from "react-router-dom";

type XRayCardProps = {
    id: number
    url: string,
    date: string,
    openModal: (analysis: AnalyzeXRayResponse) => void
}

export const XRayCard = ({id, url, date, openModal}: XRayCardProps) => {

    const navigate = useNavigate();

    const onAnalyze = async () => {
        try {
            const response = await analyzeXRay({
                authToken: localStorage.getItem('authToken') ?? '',
                imageId: id
            });
            console.log(response)
            openModal(response);
        }
        catch (e) {
            console.error(e)
        }
    };

    const onDelete = async () => {
        try {
            deleteXRayImage(id, localStorage.getItem('authToken') ?? '').then((data) => {
                console.log(data);
                navigate(0);
            });
        }
        catch (e) {
            console.error(e)
        }
    }

    return (
        <Card title={date} bodyStyle={{padding: 0, height: 200, display: 'flex', flexDirection: 'column'}}>
            <div style={{overflow: "hidden", flexGrow: 1}}>
                <Image src={url} width={'100%'} height={'100%'} style={{objectFit: 'cover'}}/>
            </div>
            <Flex style={{padding: 8}} gap={8}>
                <Button danger onClick={onDelete}>Delete</Button>
                <Button style={{flexGrow: 1}} onClick={onAnalyze}>Analyze image</Button>
            </Flex>
        </Card>
    )
}