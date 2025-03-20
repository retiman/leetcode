from leetcode.tree.design_in_memory_file_system import FileSystem


def test_case_1():
    fs = FileSystem()

    assert fs.ls("/") == []

    fs.mkdir("/a/b/c")
    fs.addContentToFile("/a/b/c/d", "hello")

    assert fs.ls("/") == ["a"]
    assert fs.readContentFromFile("/a/b/c/d") == "hello"
