# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['test_case_1 1'] = [
    [
        'A'
    ],
    [
        'B',
        'C'
    ],
    [
        'D',
        'E',
        'F'
    ]
]

snapshots['test_case_2 1'] = [
    [
        'A',
        'F'
    ],
    [
        'B',
        'C',
        'G'
    ],
    [
        'D',
        'E'
    ]
]
