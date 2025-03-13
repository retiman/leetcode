# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals
from snapshottest import Snapshot


snapshots = Snapshot()

snapshots["test_case_1 1"] = ["oath", "eat"]

snapshots["test_case_4 ['oath', 'pea', 'eat', 'rain', 'hklf', 'hf']"] = [
    ["o", "a", "a", "n"],
    ["e", "t", "a", "e"],
    ["i", "h", "k", "r"],
    ["i", "f", "l", "v"],
]
