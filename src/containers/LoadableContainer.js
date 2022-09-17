import Loadable from "react-loadable";

const LoadableLoginContainer = Loadable({
  loader: () => import("./LoginContainer"),
  loading: function () {
    return null;
  },
});
const LoadableInboxContainer = Loadable({
  loader: () => import("./InboxContainer"),
  loading: function () {
    return null;
  },
});
const LoadableAssetContainer = Loadable({
  loader: () => import("./AssetContainer"),
  loading: function () {
    return null;
  },
});

export {
  LoadableLoginContainer,
  LoadableInboxContainer,
  LoadableAssetContainer,
};
