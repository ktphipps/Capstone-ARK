export default {
    name: "PlayScene",
    objects: [
        {
            name: "Main Camera",
            tag: "Camera",
            location: {x:325,y:225},
            type: "Camera"
        },
        {
            name: "GUI Canvas",
            location: {x:0,y:0},
            type: "Canvas",
            children: [
                //GUI elements go in here
                {
                    name: "TestText",
                    location: {x:70,y:70},
                    type: "ScreenText",
                    componentValues: [
                        {
                            type: "RectTransform",
                            values: [
                                {
                                    key: "anchorHorizontal",
                                    value:"left"
                                },
                                {
                                    key: "anchorVertical",
                                    value:"top"
                                }
                            ]
                        },
                        {
                            type: "TimerText",
                            values: [
                                {
                                    key: "text",
                                    value: "0"
                                }
                            ],
                        }
                    ]
                }
            ]
        },
        {
            name: "FeedbackCircle",
            location: {x:320,y:240},
            type: "Target"
        }
    ]
}