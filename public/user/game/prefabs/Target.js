export default {
    name: "Target",
    components: [
        {
            type: "CircleComponent",
            values: [
                {
                    key: "radius",
                    value: "10"
                  },
                  {
                    key: "fill",
                    value: "white"
                  },
                  {
                    key: "stroke",
                    value: "white"
                  }
            ]
        },
        {
          type: "CircleCollider",
          values: [
            {
              key: "radius",
              value: "100"
            }
          ]
        }
    ]
}