import React from "react";
import {get} from "../../network"
import { InputNumber, Typography , Row, Col , DatePicker} from 'antd';
import "antd/dist/antd.css";
import { Select } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import moment from 'moment';

import { FormInstance } from 'antd/lib/form';
import { List, Avatar } from 'antd';
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};



export class BudgetDay extends React.Component {

    constructor(props) {
        super(props);
        this.state = { budget: {
                expenses: [],
                budget: null,
                startDate: null,
                endDate: null
            }
        };
    }

    componentDidMount() {
        get("budget/day?day="+"2021-02-01").then(budget => {
            this.setState({budget: budget});
        })
    }

    render() {
        return <div>
            <Row style={{padding: '10px'}}>
                <Col span={6}>
                    <Typography>StartDate:</Typography>
                </Col>
                <Col span={6}>
                    <Typography>{this.state.budget.date}</Typography>
                </Col>
                <Col span={6}>
                    <Typography>EndDate:</Typography>
                </Col>
                <Col span={6}>
                    <Typography>{this.state.budget.endDate}</Typography>
                </Col>
            </Row>
            <Row style={{padding: '10px'}}>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.budget.expenses}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.amount}
                                description={item.category?.name}
                            />
                        </List.Item>
                    )}
                />
            </Row>
            <Row>
                <Col span={6}>
                    <Typography>Remains: </Typography>
                </Col>
                <Col span={6}>
                    <Typography>{this.state.budget.budget}</Typography>
                </Col>
            </Row>
        </div>;
    }
}

const dateFormat = 'YYYY-MM-+DD';