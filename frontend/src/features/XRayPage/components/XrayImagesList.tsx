import {Col, Image, Modal, Row, Space} from "antd";
import React, {useEffect, useMemo} from "react";
import {XRayCard} from "./XRayCard";
import {getMyImagesUrls} from "../../../api/ml/getMyImagesUrls";
import {env} from "../../../env";
import {AnalyzeXRayResponse} from "../../../api/ml/analyzeXRay";

export const XrayImagesList = () => {

    const [images, setImages] = React.useState<{ id: number, url: string }[]>([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [analysis, setAnalysis] = React.useState<AnalyzeXRayResponse>();

    const openModal = (analysis: AnalyzeXRayResponse) => {
        setModalVisible(true);
        setAnalysis(analysis);
    };

    useEffect(() => {
        getMyImagesUrls({
            authToken: localStorage.getItem('authToken') ?? ''}
        ).then(({images}) => setImages(images));
    }, []);

    const xRayCards = useMemo(() => images.map(({id, url}) => {
        return (<Col span={8} key={id}><XRayCard id={id} url={env.BACKEND_URL + url} date={'date will be here'} openModal={openModal}/></Col>);
    }), [images]);

    return (
        <>
            <Modal footer={null} title="Results of analysis" open={modalVisible} onCancel={() => setModalVisible(false)}>
                <Image src={`data:image/png;base64,${analysis?.processed_image}`} width={'100%'}/>
                {
                    analysis?.predicted_class ? (
                        <p>
                            You are probably have a disease, please, contact your doctor for more information.
                        </p>
                    ) : (
                        <p>
                            The program didn't find any diseases, but you should contact your doctor for more information.
                        </p>

                    )
                }
            </Modal>
            <Row gutter={[16, 16]}>
                { xRayCards }
            </Row>
        </>
    );
};