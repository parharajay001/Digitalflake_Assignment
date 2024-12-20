export interface ISideMenuItem {
  title: string;
  key: string;
  link: string;
  Icon?: React.ElementType | any;
}

export interface IRoute {
  uniqueKey: string;
  path: string;
  component: React.FC;
}
