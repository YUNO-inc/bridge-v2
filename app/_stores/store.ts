import { Action } from "redux";
import { BusinessI } from "../_lib/actions/business/interfaces";
import { UserI } from "../_lib/actions/user/interfaces";

type InitialStateI = {
  BusinessType: string;
  user: UserI | null;
  cart: BusinessI[];
};

const initialState: InitialStateI = {
  BusinessType: "shawarma",
  user: null,
  cart: [],
};

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
