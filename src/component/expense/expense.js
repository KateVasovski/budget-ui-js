import React from "react";
import {get} from "../../network"
import { InputNumber, Typography , Row, Col , DatePicker} from 'antd';
import "antd/dist/antd.css";
import { Select } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import moment from 'moment';

import { FormInstance } from 'antd/lib/form';
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


export class Expense extends React.Component {

    constructor(props) {
        super(props);
        let categories = ['Продукты', 'Развлечения', 'Цех']
        const children = [];
        for (let i = 0; i < categories.length; i++) {
            children.push(<Option key={categories[i]}>{categories[i]}</Option>);
        }
        this.state = { expense: {
                id: null,
                amount: null,
                date: moment()
            },
            children: children,
        };
        this.onChange = this.onChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        if (!this.props.createMode) {
            get("expense/"+this.props.match.params.id).then(expense => {
                this.setState({expense: expense})
            })
        }

    }

    onChange(event) {
        this.setState({expense : {
                ...this.state.expense,
                amount: event.value
            }})
    }

    onDateChange(dateValue) {
        this.setState({expense : {
                ...this.state.expense,
                date: dateValue
            }})
    }

    save(){
        console.log("saved")
    }



    render() {
        return <div>
            <Row style={{padding: '10px'}}>
                <Col span={8}>
                    <Typography>Amount</Typography>
                </Col>
                <Col span={8}>
                    <Input value = {this.state.expense.amount} valuemin={0} step={0.1} onChange={this.onChange}
                   style={{ width: '100%' }}/>
                </Col>
            </Row>
            <Row style={{padding: '10px'}}>
                <Col span={8}>
                    <Typography>Date</Typography>
                </Col>
                <Col span={8}>
                <DatePicker value={moment(this.state.expense.date)} onChange={this.onDateChange}
                            style={{ width: '100%' }}/>
                </Col>
            </Row>
            <Row style={{padding: '10px'}}>
                <Col span={8}>
                    <Typography>Category</Typography>
                </Col>
                <Col span={8}>
                    <Select style={{ width: '100%' }} value={this.state.expense.category?.name}>
                        {this.state.children}
                    </Select>
                </Col>
            </Row>

            <Button type="primary" htmlType="submit">
                Save
            </Button>
        </div>;
    }
}

const dateFormat = 'YYYY-MM-+DD';