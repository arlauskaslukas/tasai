import _ from "lodash";

const RegexTools = () => {
  const formatDate = (string) => {
    let returnable = _.replace(string, new RegExp(".[0-9]*Z"), "");
    returnable = _.replace(returnable, "T", " ");
    return returnable;
  };
};

export default RegexTools;
