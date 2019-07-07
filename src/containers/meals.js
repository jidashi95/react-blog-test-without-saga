import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Table, Row, Col, Button, Pagination, Form, Panel } from 'react-bootstrap'
import moment from "moment"
import {MEALS_PER_PAGE} from '../constants';
import { getMeals, deleteMeal } from '../actions/api'
import {DateTimeField} from "../components/formItems"
import ErrorAlert from "../components/errorAlert"

const isDate = (value) => value !== undefined && value !== "" && !(value instanceof moment) && "Not Date Format"
const isTime = (value) => value !== undefined && value !== "" && !(value instanceof moment) && "Not Time Format"

class Meals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: null
    }
  }

  static propsTypes = {
    getMeals: PropTypes.func,
    deleteMeal: PropTypes.func,
    handleSubmit: PropTypes.func,
    history: PropTypes.object
  };

  componentWillMount() {
    this.fetchMeals({page:1, per_page:MEALS_PER_PAGE})
  }

  fetchMeals(params) {
    const { getMeals, mealsData: {pagination}, filterFormValues } = this.props
    
    return getMeals( {
      ...pagination,
      date_from: filterFormValues && filterFormValues.date_from ? filterFormValues.date_from.format("YYYY-MM-DD") : null,
      date_to: filterFormValues && filterFormValues.date_to ? filterFormValues.date_to.format("YYYY-MM-DD") : null,
      time_from: filterFormValues && filterFormValues.time_from ? filterFormValues.time_from.format("HH:mm:ss") : null,
      time_to: filterFormValues && filterFormValues.time_to ? filterFormValues.time_to.format("HH:mm:ss") : null,
      ...params
    } ).catch(res => this.setState({ errors: [res.message] }))
  }
  
  selectPage = (page) => {
    this.fetchMeals({page})
  }

  deleteMeal(id){
    const { deleteMeal } = this.props
    if(window.confirm("Do you really want to delete the meal?")) {
      deleteMeal(id).then( res => {
          return this.fetchMeals({})
      }).catch(res => this.setState({ errors: [res.message] }))
    }
  }

  editMeal(id){
    const { history } = this.props
    history.push('/meals/'+id)
  }

  newMeal() {
    const { history } = this.props
    history.push('/meals/new')
  }

  filterMeals = (values) => {
    const params = {
      date_from: values.date_from ? values.date_from.format("YYYY-MM-DD") : null,
      date_to: values.date_to ? values.date_to.format("YYYY-MM-DD") : null,
      time_from: values.time_from ? values.time_from.format("HH:mm:ss") : null,
      time_to: values.time_to ? values.time_to.format("HH:mm:ss") : null
    }
    return this.fetchMeals(params)
  }

  render() {
    const { mealsData: { meals, pagination }, handleSubmit, user } = this.props
    const { errors } = this.state

    return (
      <div>
        <h2 className="text-center">Meals</h2>
        
        <Row>
          <Col xs={10} xsOffset={1}>
            <Row>
            <div className="text-right">
              <Button onClick={this.newMeal.bind(this)}>Create New Meal</Button>
            </div>
            </Row>
            <Panel header="Filter">
            <Row>
            <Form inline onSubmit={handleSubmit(this.filterMeals)} style={{height: "85px"}}>
              <Col xs={6} md={3}>
              <Field
                name="date_from"
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                placeholder="Date From"
                component={DateTimeField}
                validate={[isDate]}
                utc={true}
              />
              </Col>
              <Col xs={6} md={3}>
              <Field
                name="date_to"
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                placeholder="Date To"
                component={DateTimeField}
                validate={[isDate]}
                utc={true}
              />
              </Col>
              <Col xs={6} md={3}>
              <Field
                name="time_from"
                dateFormat={false}
                timeFormat="HH:mm:ss"
                placeholder="Time From"
                component={DateTimeField}
                validate={[isTime]}
                utc={true}
              />
              </Col>
              <Col xs={6} md={3}>
              <Field
                name="time_to"
                dateFormat={false}
                timeFormat="HH:mm:ss"
                placeholder="Time To"
                component={DateTimeField}
                validate={[isTime]}
                utc={true}
              />
              </Col>
              <Col xs={12}>
              <Button type="submit" style={{marginTop:"20px"}}>Filter</Button>
              </Col>
            </Form>
            </Row>
            </Panel>
          </Col>
        </Row>
        
        <Row>
          <Col xs={10} xsOffset={1}>
            <Table responsive bordered condensed striped>
              <thead>
                <tr>
                  { user.role === "admin" && <th>User</th>}
                  <th>Date</th>
                  <th>Time</th>
                  <th>Title</th>
                  <th>Calories</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {meals && meals.map((meal, index) => (
                  <tr key={index} style={{color: meal.is_over ? 'red' : 'green'}}>
                    { user.role==="admin" && <td>{meal.user.email} ({meal.user.name})</td> }
                    <td>{moment(meal.taken_at).format('L')}</td>
                    <td>{moment(meal.taken_at).format('LTS')}</td>
                    <td>{meal.name}</td>
                    <td>{meal.calories}</td>
                    <td>
                      <Button bsStyle="info" onClick={this.editMeal.bind(this, meal.id)}>Edit</Button>
                      &nbsp;
                      <Button bsStyle="danger" onClick={this.deleteMeal.bind(this, meal.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div>
              <Pagination prev next first last ellipsis boundaryLinks
                items={pagination.total_pages} maxButtons={5} activePage={pagination.page}
                onSelect={this.selectPage} />
            </div>
            {errors && <ErrorAlert errors={errors} />}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getMeals,
  deleteMeal,
}

const mapStateToProps = (state) => ({
  mealsData: state.entities.meals_data || {pagination:{}},
  user: state.entities.user,
  filterFormValues: getFormValues("meals-filter-form")(state)
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "meals-filter-form",
    enableReinitialize: true
  }),
  withRouter
)(Meals)