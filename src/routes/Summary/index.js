/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { push } from "react-router-redux";

import {
  getJokes,
  fetchJokeData,
  deleteJoke,
  deleteSelectedJoke
} from "../../actions";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./summary.css";
const deleteIcon = require("./delete.png");
const downArrow = require("./down.png");
const upArrow = require("./up.png");

class Pure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      items: this.props.items,
      isSort: false,
      isDeleteEnabled: true,
      isChecked: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSortTimeStamp = this.onSortTimeStamp.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
    this.selectAllHandler = this.selectAllHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  componentDidMount() {
    this.props.getJokes();
  }

  // To do:: update latest life cycle methods
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.items) !== JSON.stringify(this.props.items)) {
      this.setState({ items: nextProps.items });
    }
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (JSON.stringify(nextProps.items) !== JSON.stringify(prevState.items)) {
  //     return { items: nextProps.items };
  //   }
  //   return null;
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (JSON.stringify(prevProps.items) !== JSON.stringify(prevState.items)) {
  //     this.setState({ items: this.props.items });
  //   }
  // }

  handleChange(event) {
    const value = event.target.value;
    const totalItems = this.props.items;
    this.setState({
      value,
      items:
        value === "All"
          ? totalItems
          : totalItems.filter(item => item.status === value)
    });
  }

  onSortTimeStamp(event) {
    const totalItems = this.state.items;
    const isSort = !this.state.isSort;
    this.setState({
      isSort,
      items: totalItems.sort((a, b) => {
        return isSort
          ? a.createDate < b.createDate
            ? -1
            : a.createDate > b.createDate
            ? 1
            : 0
          : a.createDate > b.createDate
          ? -1
          : a.createDate < b.createDate
          ? 1
          : 0;
      })
    });
  }

  onDeleteHandler() {
    const updatedItems = this.state.items
      .filter(item => item.checked)
      .reduce((acc, item) => {
        acc.push(item.id);
        return acc;
      }, []);
    this.props.deleteSelectedJoke(updatedItems);
    const { items } = this.state;
    this.setState({
      items,
      isChecked: false,
      isDeleteEnabled: true
    });
  }

  deleteJoke(id) {
    confirmAlert({
      title: "Cofirm",
      message: "Are you sure to delete.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            id ? this.props.deleteJoke(id) : this.onDeleteHandler()
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  }
  selectAllHandler(event) {
    const {
      target: { checked }
    } = event;
    const items = this.state.items.map(item => ({
      ...item,
      checked
    }));
    const updatedItemsLength = items.filter(item => item.checked).length;
    this.setState({
      isChecked: checked,
      items,
      isDeleteEnabled: updatedItemsLength === 0
    });
  }

  selectHandler(event, id) {
    const {
      target: { checked }
    } = event;
    const { items } = this.state;
    const updateItems = items.map(item => {
      const value = item.id === id ? checked : item.checked;
      return { ...item, checked: value };
    });

    const updatedItemsLength = updateItems.filter(item => item.checked).length;
    const isChecked = updatedItemsLength === items.length;
    this.setState({
      items: updateItems,
      isChecked,
      isDeleteEnabled: updatedItemsLength === 0
    });
  }

  render() {
    const { items, value, isSort, isDeleteEnabled, isChecked } = this.state;
    const { navigate, navigateToHome } = this.props;
    if (items.length === 0) {
      return [
        <h1 className="h1">Summary</h1>,
        <h3 className="h1">
          No Summary data to display go back to home and do actions on jokes
        </h3>,
        <div className="buttonDiv">
          <button className="deleteBtn" onClick={() => navigateToHome()}>
            Home
          </button>
        </div>
      ];
    }
    return (
      <div>
        <h1 className="h1">Summary</h1>
        <div className="buttonDiv">
          <button
            className={isDeleteEnabled ? "deleteBtnDisabled" : "deleteBtn"}
            disabled={isDeleteEnabled}
            onClick={() => this.deleteJoke()}
          >
            Delete
          </button>
        </div>
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          className="summery-table"
        >
          <thead>
            <tr>
              <th className="th1">S.no</th>
              <th className="th2">JokeId</th>
              <th className="th3">Joke</th>
              <th className="th4">
                <select value={value} onChange={this.handleChange}>
                  <option value="" selected disabled hidden>
                    Filter By
                  </option>
                  <option value="New">New</option>
                  <option value="Like">Like</option>
                  <option value="Unlike">Unlike</option>
                  <option value="All">All</option>
                </select>
              </th>
              <th className="th5" onClick={this.onSortTimeStamp}>
                TimeStamp
                <img
                  className="arrow-icon"
                  src={isSort ? upArrow : downArrow}
                />
              </th>
              <th className="th6">Delete</th>
              <th className="th7">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onClick={this.selectAllHandler}
                  id="deleteAll"
                  name="deleteAll"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              return (
                <tr data-qa={`tr${item.id}`} key={i}>
                  <td>{i + 1}</td>
                  <td className="td1" onClick={() => navigate(item.id)}>
                    {item.id}
                  </td>
                  <td>{item.joke}</td>
                  <td>{item.status}</td>
                  <td>{item.createDate}</td>
                  <td>
                    <img
                      className="del_img"
                      src={deleteIcon}
                      alt=""
                      onClick={() => this.deleteJoke(item.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id={item.id}
                      name="deleteAll"
                      value={item.id}
                      checked={item.checked}
                      onClick={e => this.selectHandler(e, item.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  items: login.items
});

const mapDispatchToProps = dispatch => ({
  deleteJoke: payload => dispatch(deleteJoke(payload)),
  deleteSelectedJoke: payload => dispatch(deleteSelectedJoke(payload)),
  getJokes: () => dispatch(getJokes()),
  navigate: payload => dispatch(fetchJokeData(payload)),
  navigateToHome: () => dispatch(push("/login"))
});

export const Summary = connect(mapStateToProps, mapDispatchToProps)(Pure);
