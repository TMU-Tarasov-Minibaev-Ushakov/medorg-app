import {Col, Image, Modal, Row, } from "antd";
import React, {useEffect, useMemo} from "react";
import {MRICard} from "./MRICard";
import {env} from "../../../env";
import {AnalyzeMRIResponse} from "../../../api/ml/analyzeMri";
import {getMyMriImagesUrls} from "../../../api/ml/getMyMriImagesUrls";

export const MRIImagesList = () => {

    const [images, setImages] = React.useState<{ id: number, url: string }[]>([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [analysis, setAnalysis] = React.useState<AnalyzeMRIResponse>();

    const openModal = (analysis: AnalyzeMRIResponse) => {
        setModalVisible(true);
        setAnalysis(analysis);
    };

    useEffect(() => {
        getMyMriImagesUrls({
            authToken: localStorage.getItem('authToken') ?? ''}
        ).then(({images}) => setImages(images));
    }, []);

    const mriCards = useMemo(() => images.map(({id, url}) => {
        return (<Col span={8} key={id}><MRICard id={id} url={env.BACKEND_URL + url} date={'date will be here'} openModal={openModal}/></Col>);
    }), [images]);

    return (
        <>
            <Modal footer={null} title="Results of analysis" open={modalVisible} onCancel={() => setModalVisible(false)}>
                <Image src={`data:image/png;base64,${analysis?.processed_image}`} width={'100%'}/>
            </Modal>
            <Row gutter={[16, 16]}>
                { mriCards }
            </Row>
        </>
    );
};