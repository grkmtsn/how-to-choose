import { Question } from "./types";

export const data = {
  question: {
    id: 1,
    label: "Is the multiple selection possible?",
    answers: [
      {
        id: 11,
        label: "Yes",
        level: "success",
        component: {
          type: "Select",
        },
      },
      {
        id: 12,
        label: "No",
        level: "danger",
        component: null,
        question: {
          id: 2,
          label: "Do a search icon needs to be displayd?",
          answers: [
            {
              id: 21,
              label: "Yes",
              level: "success",
              component: null,
              question: {
                id: 3,
                label: "Is the search triggering a Dropdown?",
                answers: [
                  {
                    id: 31,
                    label: "Yes",
                    level: "success",
                    component: null,
                    question: {
                      id: 4,
                      label: "Is the search triggering a Dropdown?",
                      answers: [
                        {
                          id: 41,
                          label: "Yes",
                          level: "success",
                          component: {
                            type: "Combobox",
                          },
                        },
                        {
                          id: 42,
                          label: "No",
                          level: "danger",
                          component: null,
                          question: {
                            id: 5,
                            label: "Is the search triggering a Dropdown?",
                            answers: [
                              {
                                id: 51,
                                label: "1",
                                level: "natural",
                                component: {
                                  type: "Combobox",
                                },
                              },
                              {
                                id: 52,
                                label: "2-5",
                                level: "natural",
                                component: {
                                  type: "Search",
                                },
                              },
                              {
                                id: 53,
                                label: "More than 5",
                                level: "natural",
                                component: {
                                  type: "Search",
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                  {
                    id: 32,
                    label: "No",
                    level: "danger",
                    component: {
                      type: "Search",
                    },
                  },
                ],
              },
            },
            {
              id: 22,
              label: "No",
              level: "danger",
              component: {
                type: "Combobox",
              },
            },
          ],
        },
      },
    ],
  } as Question,
};
