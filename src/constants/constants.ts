export const aliveCellsMaps = {
    sample1: ['1:1', '1:2', '2:1', '2:2'],
    sample2: ['2:1', '2:2', '2:3'],
    sample3: ['1:2', '2:3', '3:1', '3:2', '3:3'],
    sample4: ['2:2', '2:3', '2:4', '3:1', '3:2', '3:3'],
    sample5: [
        '1:5', '2:5', '3:5', '3:6',
        '1:11', '2:11', '3:11', '3:10',
        '5:1', '5:2', '5:3', '6:3',
        '5:6', '5:7', '6:7', '6:5', '7:5', '7:6',
        '5:9', '5:10', '6:9', '6:11', '7:10', '7:11',
        '5:13', '5:14', '5:15', '6:13',
        '11:1', '11:2', '11:3', '10:3',
        '9:5', '9:6', '10:5', '11:6', '11:7', '10:7',
        '10:9', '11:9', '11:10', '9:10', '9:11', '10:11',
        '10:13', '11:13', '11:14', '11:15',
        '13:5', '13:6', '14:5', '15:5',
        '13:10', '13:11', '14:11', '15:11'
    ]
};

export const presets = {
  default: {
      label: '50x50 random grid',
      type: 'default',
      size: 50,
      cellSize: 12,
      aliveCells: undefined
  },
  preset1: {
      label: '4x4 predefined',
      type: 'preset1',
      size: 4,
      cellSize: 25,
      aliveCells: aliveCellsMaps.sample1
  },
  preset2: {
      label: '5x5 predefined linear',
      type: 'preset2',
      size: 5,
      cellSize: 25,
      aliveCells: aliveCellsMaps.sample2
  },
  preset3: {
      label: '5x5 prefifined random',
      type: 'preset3',
      size: 5,
      cellSize: 25,
      aliveCells: aliveCellsMaps.sample3
  },
  preset4: {
      label: '6x6 predefined',
      type: 'preset4',
      size: 6,
      cellSize: 25,
      aliveCells: aliveCellsMaps.sample4
  },
  preset5: {
      label: '17x17 predefined',
      type: 'preset5',
      size: 17,
      cellSize: 25,
      aliveCells: aliveCellsMaps.sample5
  }
};

export const speed = [
    10, 500, 1000, 2000, 3000
];
