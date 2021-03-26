import React from 'react'
import { Col, Card,} from 'react-bootstrap';

const AdditionalInfo = () => {
    return (
        <>
                            <Col md={6} xl={4}>
                                <Card>
                                    <Card.Body className='border-bottom'>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-auto">
                                                <i className="feather icon-zap f-30 text-c-green"/>
                                            </div>
                                            <div className="col">
                                                <h3 className="f-w-300">235</h3>
                                                <span className="d-block text-uppercase">total ideas</span>
                                            </div>
                                        </div>
                                    </Card.Body>
                                    <Card.Body>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-auto">
                                                <i className="feather icon-map-pin f-30 text-c-blue"/>
                                            </div>
                                            <div className="col">
                                                <h3 className="f-w-300">26</h3>
                                                <span className="d-block text-uppercase">total locations</span>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
        </>
    )
}

export default AdditionalInfo
