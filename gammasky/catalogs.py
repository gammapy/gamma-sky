"""
Prepare catalog data for the website.
"""
import json
from pathlib import Path
import click
from astropy.table import Table


__all__ = [
    'make_3fgl_catalog_data',
    'make_2fhl_catalog_data',
    'make_snrcat_catalog_data'

]

# TODO Combine the two make_catalog_data functions


def make_3fgl_catalog_data():
    click.secho('Making 3FGL catalog data...', fg='green')

    out_dir = Path('data/cat')
    out_dir.mkdir(parents=True, exist_ok=True)

    table = Table.read('https://github.com/gammapy/gammapy-extra/blob/master/datasets/catalogs/fermi/gll_psc_v16.fit.gz?raw=true')
    cols = [
        'Source_Name',
        'RAJ2000',
        'DEJ2000',
        'GLON',
        'GLAT',
        'ASSOC1',
        'CLASS1'

    ]

    # Making empty Assoc cells say "None"
    assoc_mask = table['ASSOC1'].data == 26 * " "
    table['ASSOC1'][assoc_mask] = "None" + (22 * " ")

    # Making empty Class cells say "unk" to matck 2FHL
    class_mask = table['CLASS1'].data == 5 * " "
    table['CLASS1'][class_mask] = "unk" + (3 * " ")

    click.echo('Converting table to pandas dataframe...')
    df = table[cols].to_pandas()
    text = df.to_json()

    filename = 'data/cat/cat_3fgl.json'
    click.secho('Writing 3fgl {}'.format(filename), fg='green')
    with open(filename, 'w') as fh:
        fh.write(text)


def make_2fhl_catalog_data():
    click.secho('Making 2FHL catalog data ...', fg='green')

    out_dir = Path('data/cat')
    out_dir.mkdir(parents=True, exist_ok=True)

    table = Table.read('https://github.com/gammapy/gammapy-extra/blob/master/datasets/catalogs/fermi/gll_psch_v08.fit.gz?raw=true')
    cols = [
      'Source_Name',
      'RAJ2000',
      'DEJ2000',
      'GLON',
      'GLAT',
      'ASSOC',
      'CLASS'
    ]
    # For debugging ... just select first 5 sources
    # table = table[:5]

    # Making empty Assoc cells say "None"
    assoc_mask = table['ASSOC'].data == ""
    table['ASSOC'][assoc_mask] = "None"

    click.echo('Converting table to pandas dataframe ...')
    df = table[cols].to_pandas()
    text = df.to_json()

    filename = 'data/cat/cat_2fhl.json'
    click.secho('Writing 2fhl {}'.format(filename), fg='green')
    with open(filename, 'w') as fh:
        fh.write(text)


def make_snrcat_catalog_data():
    click.secho('Making SNRcat catalog data...', fg='green')

    out_dir = Path('data/cat')
    out_dir.mkdir(parents=True, exist_ok=True)

    table = Table.read('https://github.com/gammapy/gammapy-extra/blob/master/datasets/catalogs/snrcat.fits.gz?raw=true')
    cols = [
        'Source_Name',
        'RAJ2000',
        'DEJ2000',
        'GLON',
        'GLAT',
        'id_alt',
        'size_radio_mean'
    ]

    # Making empty Assoc cells say "None"
    assoc_mask = table['id_alt'].data == "N/A"
    table['id_alt'][assoc_mask] = "None"

    click.echo('Converting table to pandas dataframe...')
    df = table[cols].to_pandas()
    text = df.to_json()

    filename = 'data/cat/cat_snrcat.json'
    click.secho('Writing SNRcat {}'.format(filename), fg='green')
    with open(filename, 'w') as fh:
        fh.write(text)
