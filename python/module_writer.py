import os
import argparse

def fill_template(title, semester, pillar, weight):
        template = """---
title: "{}"
semester: {}
studycredits: 6
weight: {}
pillar: "{}"
tracks:
- bachelor-creative-tech-ai
bachelor-creative-tech-ai: true
---
""".format(title, semester, weight, pillar)
        with open(f"modules/{title.lower()}.md", "w") as f:
            f.write(template)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("module_info", nargs="+", help="List of module information strings in the format 'title, semester, pillar, weight'")
    args = parser.parse_args()
    # print(args.module_info)
    fill_template(*args.module_info)