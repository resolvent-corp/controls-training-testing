// export type VideoType = {
//   commentingAllowed: boolean;
//   count: number;
//   creator: {
//     handle: string;
//     id: string;
//     name: string;
//     pic: string;
//   };
//   postId: string;
//   reaction: {
//     count: number;
//     voted: boolean;
//   };
//   submission: {
//     description: string;
//     hyperlink: string;
//     mediaUrl: string;
//     placeholderUrl: string;
//     thumbnail: string;
//     title: string;
//   };
// };

export type VideoType = {
  id: string;
  description: string;
  mediaUrl: string;
  thumbnail: string;
  title: string;
  feedback: boolean;
  currentTime?: number;
};
